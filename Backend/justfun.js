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
    "WM_SEC.ACCESS_TOKEN": "eyJraWQiOiI2NDk2ZDZlZS1iZWE4LTRkMDEtOTYwMS04YjdlNGZkYWUzMGMiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..COtyBjsYe04c_66U.KxhyRqo4hg6uryR6b39LVAFf7vSJR0E5QeDTjqAve6wHSqLxoFT2AARjC81WOhkr--w83FWYwiZfKtgzGCHVCXTKfVbbSCmzEowPQ3Su3vRGZf7B0r2flW7mEB6BdcMDacGiuPNnt_pwdEXXVg0IMrj1y8X3CN9t1WSPSfAzwHJ1Py5fJ3LtHummFZS7c92nzGFNROxlZ1qU8RP3U-VUAQd-cxComUcdYIiA4A_c1sUiwtEYAqHgFhyOOOiycNgNkkjgdypQXmhBa_zn8a92pUoLkzedpWeHnNIbfEL0fOV_03D0BBEcEc1jrYTdAaG7ewQxrH9zwOXcCtepaLLk3Mo1oAdXsMNzk93m9GbmzAWW0IxbMNoK808xb6Kw-24w7mpAqhZ73f-p9Lf0weXkl17EpIlNF5AlWAO3AD4Gk8j29k_KwOHM_vIEq1yBn2J-hpMJtYsJ-pIj4njHAda8t62juEFzgztij2AzXOvZ9MwUFotpBGkvkrccypBlPS_O6ZKhTmfBEDJGN8eOiutyLiFm5tXV7uAQ68ZSzMXnTjXCmypQHMHaBDjGinf_q9zkQCS4dWzICtvDWAgkHUkB_8lVtsNxthNLkjyZ7P011PwlEPlzDS-TCN_--vL30uGjU2AGnk6sRb3JZj1ieva8FDf8z1A9BuGrIZpnVbXPDXuuN0vFg192649Na2xOvBlYm1MGE-IkS3MKtXXS0mHnBmseVytd7b8wzEZ0toGdEak5u1AIFe-YljeLU48wqaBstLp_5n2JT3K9MRP0V-Lt5X99qFUjvjBT7YZZO-xFA4UtvIdLJRYeqDJGusdiQHVJ8utOx_MYCbvtk4gsyEnWsoCr5Si6e2Z6CfZV8YOw08gHuePO3RNLIufsOu15Fr5x_lzZjjglL2sJuueHoVFJ39TVWGoIbzYMsuCXQ1RYSmzJHz05xSavlzLvQlt4W4Y14V_no1D2g67G6JPti3J4Mx7CAzkpPeq8eU13GfldHsWVA15ysbEJ2W-WmeyHCBrZC8-ULCLxzyRJdthS3KRE.pF1kQunfUI1HwNJL-TTrZw",
    "WM_SVC.NAME": "Get All Items",
  };

  try {
    const response = await axios.get(
        "https://marketplace.walmartapis.com/v3/items",

    //   `https://marketplace.walmartapis.com/v3/items?limit=${req.params.limit}&lifecycleStatus=${req.params.lifecycleStatus}`,
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
