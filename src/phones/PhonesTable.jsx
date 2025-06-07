import { usePhones } from "./usePhones";

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
          render={(phoneDetails) => (
            <PhoneRow phoneDetails={phoneDetails} key={phoneDetails.id} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default PhonesTable;
