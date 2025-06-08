import { usePhones } from "./usePhones";
import Spinner from "../ui/Spinnner";
import PhoneRow from "./PhoneRow";
import Menus from "../ui/Menus";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";

function PhonesTable() {
  const { isLoading, phones, count } = usePhones();

  if (isLoading) return <Loader />;
  return (
    <Menus>
      <Table columns="0.12fr 0.2fr 0.35fr 0.15fr 0.35fr 0.2fr 0.5fr">
        <Table.Header role="row">
          <div></div>
          <div>image</div>
          <div>Phone model</div>
          <div>IMEI</div>
          <div>Phone condition</div>
          <div>Cost</div>
          <div>Status</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={phones}
          render={(phone) => <PhoneRow phone={phone} key={phone.id} />}
        />
      </Table>

      <Table.Footer className="mt-auto">
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default PhonesTable;
