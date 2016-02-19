var Forms = ({form, formHandleSubmit}) => {
  return (
    <div className="formsEntry">
      <form className="scheduler">
        <input className="dest" placeholder="I want to go to..." />
        <input className="timeDepart" placeholder="I want to leave at..." />
        <input className="timeReturn" placeholder="I have to be back by..." />
        <button className="scheduleTrain">Schedule Train</button>
      </form>
    </div>
  )
};

window.Forms = Forms;