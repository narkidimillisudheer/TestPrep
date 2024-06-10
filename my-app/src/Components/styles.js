import styled from 'styled-components';

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  text-align: center;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Score = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  & span:first-child {
    font-size: 14px;
    font-weight: normal;
    display: block;
  }
`;

export const RawScore = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;

export const ReviewButton = styled.button`
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`;
export const Tips = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

export const Tip = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;