import PhonesTable from "../phones/PhonesTable";
import Row from "../ui/Row";
import AddPhone from "../phones/AddPhone";
import PhonetableOperation from "../phones/PhonetableOperation";

function Phones() {
  return (
    <>
      <Row>
        <PhonetableOperation />
      </Row>

      <Row type="vertical">
        <PhonesTable />

        <AddPhone />
      </Row>
    </>
  );
}

export default Phones;
