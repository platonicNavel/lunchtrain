const TrainsListEntry = ({train, handleTrainBoardingClick}) => 
{
  return (
    <div className="trainEntry">
      <div className="trainContainer">
        <div className="trainIconTimeWrapper">
          <div className="trainIcon"></div>
          <div className="timeWrapper">
            <div className="time">{train.timeDeparting}---{train.timeBack}</div>
          </div>
        </div>
      </div>
    </div>
  )
}