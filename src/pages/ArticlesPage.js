import React,{useState} from "react";
import ArticlesTable from "../components/ArticlesTable";
import StepModal from "../components/StepModal";
import { VisibleContext } from "../components/VisibilityContext";


const Articles = () => {
  const [isModalVisible, setVisibilty] = useState(false);
  const handleVisibility = () => {
    setVisibilty(!isModalVisible);
  };
  return (
    <VisibleContext.Provider value={{handleVisibility:handleVisibility}}>
      <ArticlesTable />
      <StepModal
        handleVisibility={handleVisibility}
        isModalVisible={isModalVisible}
      />
    </VisibleContext.Provider>
  );
};

export default Articles;
