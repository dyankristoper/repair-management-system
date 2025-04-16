import styled from "styled-components";

const StyledPhoneDetails = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img {
    width: 100%;
  }

  & p {
    font-size: 12px;
  }

  & span {
    font-size: 14px;
  }
`;

const ImageBox = styled.div`
  width: 30rem;
`;

const StyledDiv = styled.div`
  width: 35rem;
`;

function ViewPhoneDetails({ phoneDetails }) {
  const {
    image,
    customer,
    contactNumber,
    phoneModel,
    imei,
    address,
    phoneCondition,
    assignee,
  } = phoneDetails;

  return (
    <StyledPhoneDetails>
      <ImageBox>
        <img src={image} />
      </ImageBox>
      <StyledDiv>
        <p>
          Customer : <span>{customer}</span>
        </p>
        <p>
          Contact : <span>{contactNumber}</span>
        </p>
        <p>
          Address : <span>{address}</span>
        </p>
        <p>
          Device : <span>{phoneModel}</span>
        </p>
        <p>
          Imei : <span>{imei}</span>
        </p>
        <p>
          Phone issue : <span>{phoneCondition}</span>
        </p>
        <p>
          Assigned to : <span>{assignee}</span>
        </p>
      </StyledDiv>
    </StyledPhoneDetails>
  );
}

export default ViewPhoneDetails;
