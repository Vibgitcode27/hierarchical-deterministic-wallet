import { Flex , Image } from "antd";
import guy1 from "../../assets/image-removebg-preview (2).png"
import guy2 from "../../assets/image-removebg-preview (1) (1).png"
import logo from "../../assets/profile-removebg-preview.png"
import "../../styles/button.css"
import "../../styles/home.css"
export default function Home() {

 return(
    <div style={{ 
      height: "93vh", 
      borderRadius: "30px", 
      padding: "20px" 
    }}>
      <Flex gap={30} style={{ marginTop: "20px" }}>
        <Flex 
          align="center" 
          justify="space-between" 
          style={{ 
            color: "white", 
            backgroundColor: "#ff4654", 
            width: "70vw", 
            height: "42vh",
            padding: "20px",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Flex 
            vertical 
            style={{ 
              width: "65%", 
              height: "100%", 
              justifyContent: "center",
              alignItems: "center",
              zIndex: 2
            }}
          >
            <Flex
              vertical 
              style={{ 
                backgroundColor: "#0000003e", 
                height: "400px", 
                width: "600px",
                borderRadius: "15px",
                padding : "10px",
                marginLeft : "-70px"
              }}
            >
              <h1>about</h1>
              <Flex style={{ width : "100%" , marginTop : "20px"}} align="center" justify="center" vertical>
                <h1 style={{ margin: 0, fontSize: "23px" , lineHeight : "35px" }}>Empower Your Digital </h1>
                <h1 style={{ margin: 0, fontSize: "23px" }}>Assets With </h1>
                {/* <h1 style={{ color : "black" , fontSize : "70px"}}>Orion</h1> */}
                <button style={{ width : "auto"}} type="button">
                      <span style={{ backgroundColor : "white" }}>
                        <span style={{ padding : "10px" , fontSize : "80px" , color : "black"}} className="thin-border-text">Orion</span>
                      </span>
                </button>
              </Flex>
            </Flex>
          </Flex>
          <Flex 
            gap={30} 
            style={{ 
              position: "absolute",
              right: "-5%",
              top: "-10%",
              width: "50%", 
              justifyContent: "center", 
              alignItems: "center",
              zIndex: 1
            }}
          >
            <Image 
              preview={false} 
              src={guy1.src} 
              style={{ 
                width: "220px", 
                height: "auto", 
                transform: "rotate(-5deg)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
              }}
            />
            <Image 
              preview={false} 
              src={guy2.src} 
              style={{ 
                width: "200px", 
                height: "auto", 
                transform: "rotate(4deg)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            />
          </Flex>
        </Flex>
        <Flex 
          style={{ 
            color: "white", 
            backgroundColor: "#1f2023", 
            width: "30vw", 
            height: "42vh",
            borderRadius: "15px",
            padding: "20px"
          }}
        >
          <h1>ACCOUNTS</h1>
        </Flex>
      </Flex>
    </div>
 )   
}