import styled from "styled-components";
import Tag from "./Tag";
import { formatTimestamp } from "../helpers/formatTime";

const StyledPhoneDetails = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
`;

const ImageAndStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-size: 1.4rem;
  }
`;
const statusToTagName = {
  true: "green",
  false: "red",
};

const Image = styled.div`
  width: 100%;
  max-width: 12rem;
  padding: 1em;

  img {
    width: 100%;
  }
`;
const Details = styled.div`
  width: 100%;
  flex-direction: column;

  h1 {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;

  span {
    font-size: 1.2rem;
  }
  p {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 0.5em;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 4px;
    font-size: 1.4rem;
  }
`;

function ViewPhoneDetails({ phoneDetails }) {
  const {
    created_at,
    image,
    customer,
    contactNumber,
    phoneModel,
    imei,
    address,
    phoneCondition,
    assignee,
    completed,
    simtray,
    simcard,
    memorycard,
    spen,
    charger,
    brokenScreen,
    bulgedBattery,
    brokenChargingpin,
  } = phoneDetails;

  return (
    <StyledPhoneDetails>
      <ImageAndStatus>
        <Image>
          <img src={image} alt="a sample image" />
        </Image>
        <div>
          <Tag type={statusToTagName[completed]}>
            {completed === true ? "completed" : "ongoing"}
          </Tag>
          <p>Assigned to: {assignee}</p>
        </div>
      </ImageAndStatus>
      <Details>
        <div>
          <p>{formatTimestamp(created_at)}</p>
        </div>
        <Box>
          <p>
            <span>Customer:</span> {customer}
          </p>
          <p>
            <span>Contact number: +</span>
            {contactNumber}
          </p>
        </Box>
        <Box>
          <p>
            <span>Model:</span>
            {phoneModel}
          </p>
          <p>
            <span>Imei:</span>
            {imei}
          </p>
        </Box>
        <Box>
          <p>
            <span>Address:</span>
            {address}
          </p>
          <p>
            <span>Phone condition:</span>
            {phoneCondition}
          </p>
        </Box>
        <Table>
          <thead>
            <tr>
              <th>Simtray</th>
              <th>Simcard</th>
              <th>Memorycard</th>
              <th>Spen</th>
              <th>Charger</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{simtray === true ? "✅" : "❌"}</td>
              <td>{simcard === true ? "✅" : "❌"}</td>
              <td>{memorycard === true ? "✅" : "❌"}</td>
              <td>{spen === true ? "✅" : "❌"}</td>
              <td>{charger === true ? "✅" : "❌"}</td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th>Broken Screen</th>
              <th>Bulged Battery</th>
              <th>Broken Chargingpin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{brokenScreen === true ? "✅" : "❌"}</td>
              <td>{bulgedBattery === true ? "✅" : "❌"}</td>
              <td>{brokenChargingpin === true ? "✅" : "❌"}</td>
            </tr>
          </tbody>
        </Table>
      </Details>
    </StyledPhoneDetails>
  );
}

export default ViewPhoneDetails;
