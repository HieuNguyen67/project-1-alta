import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import Home from "../../pages/Home";
import About from "../../pages/BusinessRegister";
import BusinessRegister from "../../pages/BusinessRegister";
import PersonalRegister from "../../pages/PersonalRegister";

const Apps: React.FC = () => {


  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/business-register" element={<BusinessRegister />} />
        <Route path="/personal-register" element={<PersonalRegister />} />
      </Routes>
    </>
  );
};

export default Apps;
