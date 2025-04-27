import Row from "../ui/Row";
import PhonesTable from "../phones/PhonesTable";
import PhonetableOperation from "../phones/PhonetableOperation";

function Assignee() {
  return (
    <>
      {/* <Row type="horizontal">
        <p>Assigned repairs</p>
        <PhonetableOperation />
      </Row> */}
      <Row type="vertical">
        <PhonesTable />
      </Row>
    </>
  );
}

export default Assignee;
