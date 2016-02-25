const TrainsList = ({trains, joinTrain}) => {
  return (
    <div className="trainsList">
      {trains ?
        trains.map( train =>
          <TrainsListEntry key={train.trainId} train={train} joinTrain={joinTrain} />) :
          "Looks like there are no trains here!"
      }
    </div>
  )
}