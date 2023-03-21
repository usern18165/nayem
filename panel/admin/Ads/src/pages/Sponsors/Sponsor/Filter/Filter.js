import React, { useState, useEffect } from "react";
import Approve from "./Approve";
import Unseen from "./Unseen";
import Reject from "./Reject";

export default function Filter() {

    // states 
    const[approve, setApprove] = useState(false)
    const[reject, setReject] = useState(false)
    const[unseen, setUnseen] = useState(false)


    //state er kaz baki 
    // logic issue + design sesh : approave baki


  useEffect(() => {
    console.log(approve )
    console.log(unseen )
    console.log(reject )
  }, [approve, reject, unseen])
  return (
    <div className="adstable">
     <div className="filter displaySpace">
          <div>
            Approve <Approve onOff={ false}  approve={approve} setApprove={setApprove} reject={reject} setReject = {setReject} unseen={unseen}  setUnseen={setUnseen} />
          </div>
          <div>
          Unseen <Unseen  onOff={ false} approve={approve} setApprove={setApprove} reject={reject} setReject = {setReject} unseen={unseen}  setUnseen={setUnseen}  />
          </div>
          <div>
          Reject <Reject  onOff={ false} approve={approve} setApprove={setApprove} reject={reject} setReject = {setReject} unseen={unseen}  setUnseen={setUnseen}  />
          </div>
        </div>
    </div>
  );
}
