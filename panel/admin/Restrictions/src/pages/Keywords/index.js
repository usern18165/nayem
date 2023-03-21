import React, { useEffect, useState } from 'react';

import './style.scss';

import axios from 'axios';
import { BACKEND_URL } from '../../shared/constants/Variables';
import { adminHeader } from '../../shared/functions/Token';


const RenderInput = ({ index, item, handleOnChange, globalValue, handleGlobalValue }) => {


    const [checkedState, setCheckedState] = useState(false);

    useEffect(() => {
        if (globalValue) { handleGlobalValue(); setCheckedState(false) }
    }, [globalValue])

    const CheckBox = () => {
        setCheckedState(!checkedState)
    }
    return (
        <div className='select-options'>
            <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={item}
                value={item}
                checked={checkedState}
                onChange={() => { handleOnChange(item); CheckBox(); }}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{item}</label>
        </div>

    )
}

const Keywords = () => {

    const [keyword, setKeyword] = useState("");
    const [searchkeyword, setSearchKeyword] = useState("");
    const [allKeyWord, setAllkeyword] = useState([]);
    const [deleteKeyWord, setDeleKeyWord] = useState([])
    const [globalValue, setGlobalValue] = useState(false);

    const handleGlobalValue = () => setGlobalValue(false);

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/keyword`,
                { headers: adminHeader() }
            )
            .then(({ data }) => {
                setAllkeyword(data?.data[0]?.keyword.reverse());
            }).catch((err) => {
                console.log("Some thing went wrong");
            })
    }, []);


    const submitHandler = (e) => {
        e.preventDefault()

        axios.post(
            `${BACKEND_URL}/keyword`,
            {
                keyword: keyword
            },
            { headers: adminHeader() }
        ).then((res) => {

            setKeyword("");
            const newKeyword = [keyword, ...allKeyWord]
            setAllkeyword(newKeyword)
        }).catch((err) => {
            console.log(err, "it is an error.");
        })
    }

    const deleteHandler = () => {



        axios.delete(`${BACKEND_URL}/keyword`, {
            headers: adminHeader(), data: {
                keyword: deleteKeyWord
            }
        }
        ).then((res) => {

            const updateAllKeyWord = allKeyWord.filter(item => !deleteKeyWord.includes(item));
            setAllkeyword(updateAllKeyWord);
            setGlobalValue(true);

        }).catch((err) => {
            console.log(err, "something went wrong.")
        })
    }

    const searchHandler = (e) => {

        e.preventDefault();

        axios
            .post(
                `${BACKEND_URL}/keyword/filter`,
                {
                    keyword: searchkeyword
                },
                { headers: adminHeader() }
            ).then(({ data }) => {
                setAllkeyword(data?.data?.doc[0]?.keyword);
                setSearchKeyword("")
            }).catch((err) => {
                console.log("something went wrong!")
            })
    }

    const handleOnChange = (keyword) => {


        if (deleteKeyWord.includes(keyword)) {
            const updateDeleteKeyword = deleteKeyWord.filter((item) => item !== keyword);
            setDeleKeyWord(updateDeleteKeyword);

        } else {
            setDeleKeyWord([...deleteKeyWord, keyword]);
        }

    }



    return (
        <div>
            <form
                onSubmit={submitHandler}
                className='keyword-adding-section'
            >


                <div className='keywords'>
                    <input required value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter Keyword/Url" type="text" />
                </div>
                <div>
                    <button className='keyword-btn' type='submit'>submit</button>
                </div>
            </form>

            <div className='keyword-showing-section'>

                <div className='keyword-filter-section'>
                    <h3>Total Keywords: {allKeyWord?.length}</h3>
                    <div className='keywords-filter'>

                        <form onSubmit={searchHandler}>
                            <input value={searchkeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search" type="text" />
                            <button className='submit-btn' type='submit' onClick={() => searchHandler()}>Search</button>
                        </form>
                        <button type='button' className='delete-btn' onClick={() => deleteHandler()}>delete</button>
                    </div>
                </div>


                <div className='all-data-section'>
                    {


                        allKeyWord?.map((item, index) => (
                            <div className='all-keyword' key={index}>
                                {/*<p>{item}</p>
                                 <button className='delete-btn' onClick={() => deleteHandler(item)}>delete</button> */}
                                <RenderInput item={item} index={index} handleOnChange={handleOnChange} globalValue={globalValue} handleGlobalValue={handleGlobalValue} />

                            </div>
                        )
                        )
                    }
                </div>

            </div>
        </div>
    )
}



export default Keywords
