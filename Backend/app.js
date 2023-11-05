import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

// middlewares
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getProducts", async (req, res) => {
  const headers = {
    "WM_SEC.ACCESS_TOKEN": "eyJraWQiOiI2NDk2ZDZlZS1iZWE4LTRkMDEtOTYwMS04YjdlNGZkYWUzMGMiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..Zroe_tZ0u9zIl639.GhYp6r-n4UHN1zFPcyxmErc4JQ2jb0QEm_-jLE_XbQ5A3pTsKdlyYYQLJTsvkyzblt5DWf05sh3YkBoDoq3MDt86vj5uW26dh7ZfZ0qQbTslgrQA5R32uOlsR7-lzTR9gjP7T-7H1hBj1QRhxqGW4-8V6QRFjwjuomc73CvazgiloJDH_PrrbdnXXzeVoB151EpvRI6JN6HWHx-lsT1el-7lCDovbiFtItczBC9nyp7UXX-8GCkOgmUMl6vTmHK6PjnqwPPMN74FeUgacpSoRXR3fgRuojriG0-i2NnoBDZOFmRBBC77MX9WwkKZxRAN1Z3rfxtupbOIMCd8ExJkdiLVtKS5j_mavSnFTslzrpho5mE2oEXCX5_kOrXqIdVUzm_X8VXmDPGTWMYoNpB1Ql4p0z168riyEacyIqpQ9NFaTFxSnb6EPLhAX2Q8eGnqocf93U2bzQsB8LbI_ECR5S_y_6Yu0KVFnY8h7OluN5neBBrtufAwkUJQm7t_BqIWI0Nz9qPrya6ctNGQPVnaHn_UPZ_D5uCmt5p8jk3cmJBn8Kbqxwk-NclT4RrSEW0lAmDzvu7lekZCSim2AloW_21DA4nOAKsjZrazcpmLa7qvnjnv2bMptYjk9ybLckDI2qAPv-ncAw2-XGL6WfLzhqib60YyXstrt4f1ReWJ9eycAlV_M1il43EgS4D6Gj_iOb_V_rKJNv-sT_Oy1KNAfTS7b4ZDbX5XNmqjiJa3_pWRBmSu-mVfAaHxoXbqfKakMxZw50lO1ABGoZjy1UVXiS5wNMx-44ZmJ51CKU8RFb0R_R-yy-QCDF1T1a_dvZVYqxP6IzVzuR4OVoCwA-x2IUCx4TVm-OGjLMty3_JTb02ndrGnVZtydKyij08L-YB6blnGzk4YriXzP1Z8ykyyI6uHnqEIr6xJh1Zpfd6AvvEQn3Plz9BHLgEfrzo3FLr8-Xx6zxFJzmWHQJTDUesI_CQrvu-xdAb511Q4UIe5e1uDBF7RBUjV3vlzETy2A4nzaZbJH2ilffAXCJBywP8Q.u162yzsRjlreb3JMQPVqKw",
    "WM_QOS.CORRELATION_ID": "09275243-87e1-43e9-b65b-4443c4124411",
    "WM_SVC.NAME": "Get All Items",
  };

  try {
    const response = await axios.get(
      "https://marketplace.walmartapis.com/v3/items",
      { headers },
    );

    let products = response.data.ItemResponse.map((item) => {
      return {
        sku: item.sku,
        productName: item.productName,
        lifecycleStatus: item.lifecycleStatus
      };
    });
    res.json({ status: "success", message: products });
  } catch (error) {
    console.log(error)
    res.json({ status: "fail", message: error })
  }
});

app.listen(8080, () => {
  console.log("Server is running");
});
