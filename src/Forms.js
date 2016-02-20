const Forms = ({form, formHandleSubmit}) => {
  return (
    <div className="formsEntry">
      <form className="scheduler">
        <input className="dest scheduleInput" placeholder="I want to go to..." />
        <input className="timeDepart scheduleInput" placeholder="I want to leave at..." />
        <input className="timeReturn scheduleInput" placeholder="I have to be back by..." />
        <button className="scheduleTrain">Schedule Train</button>
      </form>
    </div>
  )
};

window.Forms = Forms;