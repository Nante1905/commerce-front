import Title from "../../../title/title.component";
import DemandeForm from "../../components/demande-form/demande-form.component";
import "./demande-form-root.component.scss";

const DemandeFormRoot = () => {
  return (
    <div>
      <Title text={"Insertion de besoins"} />
      <DemandeForm />
    </div>
  );
};

export default DemandeFormRoot;
