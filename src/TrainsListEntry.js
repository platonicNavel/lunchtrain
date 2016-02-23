const TrainsListEntry = ({train, handleAccordionMap}) => 
{
  return (
    <div className="trainEntry" onClick={() => handleAccordionMap(train)}>
      <div className="trainContainer">
        <div className="trainIconTimeWrapper">
          <div className="trainIcon"></div>
          <div className="timeWrapper">
            <div className="time">{train.timeDeparting}---{train.timeBack}</div>
          </div>
        </div>
        <div className="trainDetailsWrapper">
          <h2 className="trainDest">{train.destinationName}</h2>
          <div className="trainRatingsWrapper">
            <div className="likes col-xs-6"><div>♥3</div></div>
            <div className="price col-xs-6"><div>$$</div></div>
          </div>
        </div>
        <div className="passengersWrapper">
            <div className="conductor passenger">
              <div className="slackPic"></div>
            </div>
            {train.passengers.map( passenger =>
            <div className="passenger">
              <div className="slackPic"></div>
            </div>
          )}
        </div>
      </div>
      <TrainsListEntryDropdown train={train}></TrainsListEntryDropdown>
    </div>
  )
}