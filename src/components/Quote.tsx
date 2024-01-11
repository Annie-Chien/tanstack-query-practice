import S from "./components.module.scss";

const Quote = ({ text, by }: { text: string; by: string }) => {
  return (
    <div className={S.quote}>
      <p>{text}</p>
      <span>--{by}</span>
    </div>
  );
};

export default Quote;
