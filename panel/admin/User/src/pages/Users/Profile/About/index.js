import React from "react";

import { Spinner } from "../../../../shared";
import { getAbout } from "../Hooks";
import Education from "./Education";
import Location from "./Location";
import Personal from "./Personal";
import Contact from "./Contact";
import Header from "../Header";
import Work from "./Work";
import "./style.scss";
import Name from './Name'
import store from '../../../../store'
export default ({ username, privacy, isMe, changePrivacy }) => {
  document.title = "About";
  const { about, working } = getAbout(username);
  function changeAboutState(name, value) {
   
  }
  return (
    <div className="display-about">
      <Header
        title="About"
        isMe={isMe}
        privacy={privacy}
        changePrivacy={changePrivacy}
      />
      {working ? (
        <Spinner height={35} />
      ) : (
        <div className="abt-cnt">
          {
            isMe() && (
              <Name profile={about} isMe={isMe} name={about.name}/>
            )
          }
          {(isMe() || about?.work?.length > 0) && (
            <Work
              works={about.works}
              isMe={isMe}
              setWorks={(works) => changeAboutState("works", works)}
            />
          )}
          {(isMe() ||
            about.education?.school?.length > 0 ||
            about.education?.college?.length > 0 ||
            about?.education?.university?.length > 0) && (
            <Education
              educations={about?.educations}
              isMe={isMe}
              setInstitute={(institutes) =>
                changeAboutState("educations", institutes)
              }
            />
          )}
          {(isMe() || Object.keys(about?.Location || {}).length > 0) && (
            <Location
              location={about?.location || {}}
              isMe={isMe}
              setLocation={(l) => changeAboutState("location", l)}
            />
          )}

          <Contact
            about={about}
            setAbout={function(){}}
            isMe={isMe}
            username={username}
          />
          
          <Personal username={username} about={about} setAbout={function(){}} isMe={isMe} />
        </div>
      )}
    </div>
  );
};
