import React, { useEffect, useState } from "react";
import AddsModal from "./AddsModal/AddsModal";

import { Table } from "react-bootstrap";
import axios from "axios";

import "./style.scss";
import { PROMOTIONS_BACKEND_URL } from "../../shared/constants/Variables";
import { adminHeader } from "../../shared/functions/Token";
import UpdateModal from "./AddsModal/UpdateModal";

const RenderTableData = ({
  item,
  index,
  deleteDataHandler,
  globalValue,
  handleGlobalValue,
  getCategoryWisePriceById,
  handleUpdateShow,
}) => {
  useEffect(() => {
    if (globalValue) {
      handleGlobalValue();
    }
  }, [globalValue]);

  return (
    <tr className="table-data" key={index}>
      <td>{index + 1}</td>
      <td className="country">{item?.country}</td>
      <td className="state">{item?.country_state}</td>
      <td className="city">{item?.city}</td>
      <td className="ads-type">{item?.category_type}</td>
      <td>{item?.price_per_goals} USD</td>
      <td>{item?.time_per_goals} Min</td>
      <td>{item?.vat ? item?.vat : "0"}%</td>
      <td className="action-btn">
        <button
          className="update-btn"
          onClick={() => {
            getCategoryWisePriceById(item?._id);
            handleUpdateShow();
          }}>
          Update
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteDataHandler(item?._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const AddsRate = () => {
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState(null);
  const [city, setCity] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [pricePerGoals, setPricePerGoals] = useState("");
  const [timePerGoals, setTimePerGoals] = useState("");
  const [vat, setVat] = useState("");

  const [searchByCountry, setSearchByCountry] = useState();
  const [searchByState, setSearchBySate] = useState();
  const [searchByCity, setSearcByCity] = useState();

  const [allCategoryWisePriceData, setAllCategoryWisePriceData] = useState([]);
  const [categoryWisePrice, setCategoryWisePrice] = useState({});
  const [globalValue, setGlobalValue] = useState(false);

  const [filterValidation, setFilterValidation] = useState({
    vat: false,
  });

  const handleGlobalValue = () => setGlobalValue(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdateClose = () => {
    setUpdateShow(false);
    setCategoryWisePrice({});
    setFilterValidation({ vat: false });
  };

  const handleUpdateShow = () => setUpdateShow(true);

  //fetch data
  useEffect(() => {
    loadData();
  }, []);

  // load all data
  const loadData = () => {
    axios
      .get(`${PROMOTIONS_BACKEND_URL}/category-price`, {
        headers: adminHeader(),
      })
      .then((data) => {
        setAllCategoryWisePriceData(data?.data?.data);
      })
      .catch((err) => [console.log("some thing went wrong.")]);
  };

  // update and save country price
  const SaveHandler = () => {
    const body = {
      country: country?.trim(),
      country_state: state?.trim(),
      city: city?.trim(),
      price_per_goals: pricePerGoals?.trim(),
      time_per_goals: timePerGoals?.trim(),
      category_type: categoryType?.trim(),
      vat: vat?.trim(),
    };

    axios
      .post(`${PROMOTIONS_BACKEND_URL}/category-price/create-update`, body, {
        headers: adminHeader(),
      })
      .then((data) => {
        const newlyAddedData = [data?.data?.doc, ...allCategoryWisePriceData];
        setAllCategoryWisePriceData(newlyAddedData);
        setShow(false);
      })
      .catch((err) => {
        console.log("something went wrong!", err);
      });
  };

  //delete data form
  const deleteDataHandler = (id) => {
    axios
      .delete(`${PROMOTIONS_BACKEND_URL}/category-price/${id}`, {
        headers: adminHeader(),
      })
      .then((res) => {
        const updateCountryWisePrice = allCategoryWisePriceData.filter(
          (item) => item?._id != id
        );
        setAllCategoryWisePriceData(updateCountryWisePrice);
        setGlobalValue(true);
      })
      .catch((err) => {
        console.log(err, "something went wrong");
      });
  };

  //get price category by id
  const getCategoryWisePricebyId = (id) => {
    axios
      .get(`${PROMOTIONS_BACKEND_URL}/category-price/single-price/${id}`, {
        headers: adminHeader(),
      })
      .then(({ data }) => {
        // categoryWisePrice
        console.log(data?.data?.doc);
        setCategoryWisePrice(data?.data?.doc);
      })
      .catch((err) => {
        console.log("Some thing went wrong.");
      });
  };

  const onInputChange = (e) => {
    setCategoryWisePrice({
      ...categoryWisePrice,
      [e.target.name]: e.target.value,
    });
  };

  //update category wise price by id
  const updateCategoryWisePriceById = (id) => {
    const body = {
      price_per_goals: categoryWisePrice?.price_per_goals,
      time_per_goals: categoryWisePrice?.time_per_goals,
      vat: categoryWisePrice?.vat,
    };

    if (!(categoryWisePrice?.vat > 0 && categoryWisePrice?.vat < 100)) {
      setFilterValidation({
        vat: true,
      });
    } else {
      axios
        .patch(`${PROMOTIONS_BACKEND_URL}/category-price/${id}`, body, {
          headers: adminHeader(),
        })
        .then(({ data }) => {
          loadData();
          handleUpdateClose();
        })
        .catch((err) => {
          console.log("something went wrong");
        });
    }
  };

  //searching filter with country

  const searchHandler = (e) => {
    e.preventDefault();

    let body;

    if (searchByState === undefined || searchByState === "") {
      if (searchByCity) {
        body = {
          city: searchByCity?.trim(),
        };
      } else {
        body = {
          country: searchByCountry?.trim(),
        };
      }
    } else {
      body = {
        country: searchByCountry?.trim(),
        country_state: searchByState?.trim(),
        city: searchByCity?.trim(),
      };
    }

    axios
      .get(
        `${PROMOTIONS_BACKEND_URL}/category-price/filter-wise-category-price`,
        { params: body, headers: adminHeader() }
      )
      .then(({ data }) => {
        console.log(data?.data, "filter data");
        if (data?.data == undefined) {
          setAllCategoryWisePriceData([]);
        } else {
          setAllCategoryWisePriceData(data?.data);
        }
      })
      .catch((err) => {
        console.log("something wen wrong.", err);
      });
  };

  return (
    <div className="adds-rate-section">
      <div className="add-search-and-add-sections">
        <div className="search-sections">
          <form onSubmit={searchHandler}>
            <input
              value={searchByCountry == null ? "" : searchByCountry}
              onChange={(e) => setSearchByCountry(e.target.value)}
              placeholder="Enter Country"
              type="text"
            />
            <input
              value={searchByState == null ? "" : searchByState}
              onChange={(e) => setSearchBySate(e.target.value)}
              placeholder="Enter state"
              type="text"
            />
            <input
              value={searchByCity == null ? "" : searchByCity}
              onChange={(e) => setSearcByCity(e.target.value)}
              placeholder="Enter city"
              type="text"
            />
            <button className="search-btn" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="ad-modal-sections">
          <button className="add-modal" variant="primary" onClick={handleShow}>
            Add
          </button>

          <AddsModal
            show={show}
            handleClose={handleClose}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            pricePerGoals={pricePerGoals}
            setPricePerGoals={setPricePerGoals}
            timePerGoals={timePerGoals}
            setTimePerGoals={setTimePerGoals}
            SaveHandler={SaveHandler}
            setCategoryType={setCategoryType}
            vat={vat}
            setVat={setVat}
          />
        </div>
      </div>

      <div className="table-sections">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Category Type</th>
              <th>Price Per Goals</th>
              <th>Time Per Goals</th>
              <th>Vat(%)</th>
              <th className="action-header">Actions</th>
            </tr>
          </thead>

          <tbody>
            {allCategoryWisePriceData?.map((item, index) => (
              <RenderTableData
                handleGlobalValue={handleGlobalValue}
                globalValue={globalValue}
                key={index}
                index={index}
                item={item}
                deleteDataHandler={deleteDataHandler}
                getCategoryWisePriceById={getCategoryWisePricebyId}
                handleUpdateShow={handleUpdateShow}
              />
            ))}
          </tbody>
        </Table>
      </div>

      {/* Update modal  */}

      <UpdateModal
        show={updateShow}
        handleClose={handleUpdateClose}
        updateHandler={updateCategoryWisePriceById}
        onInputChange={onInputChange}
        items={categoryWisePrice}
        filterValidation={filterValidation}
      />
    </div>
  );
};

export default AddsRate;
