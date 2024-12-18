import "./auth-layout.scss";
import wp from "../../assets/images/gearup-wp.jpg";

const AuthLayout = ({ formData }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container d-flex">
        <div className="left-container col-md-6 p-5 bg-light">
          <h1>GearUp</h1>
          {formData}
        </div>

        <div className="right-container col-md-6">
          <img src={wp} alt="" />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
