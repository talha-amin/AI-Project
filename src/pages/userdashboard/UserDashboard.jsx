import {
  Footer,
  Blog,
  Possibility,
  Features,
  WhatGPT3,
  Header,
} from "./containers";
import { CTA, Brand } from "./components";
import { Navbar } from "../../components";

import "./userdashboard.css";

const UserDasboard = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar type="Talent" />
        <Header />
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

export default UserDasboard;
