import PhonesTable from "../phones/PhonesTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddPhone from "../phones/AddPhone";
import PhonetableOperation from "../phones/PhonetableOperation";

function Phones() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Phones</Heading>
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
