
import JobList from "../../components/JobList";
import "./home.css"
const Home:React.FC=()=>{
     
    return (
      <>
        {" "}
        
        <div className="block-title">
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "20px",
            }}
            className="title"
          >
            {" "}
            TÌM{" "}
            <span style={{ color: "rgb(255, 90, 0)" }}>
              CÔNG VIỆC MƠ ƯỚC
            </span>{" "}
            CỦA BẠN
            <span className="title-break"> TẠI NGÔI NHÀ MỚI</span>
          </p>
        </div>
        <JobList />
      </>
    );
}
export default  Home;