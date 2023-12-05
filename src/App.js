import React from "react";
import MyRouts from "./routes/routes";
import {NextUIProvider} from "@nextui-org/react";

function App() {
  return (
      <div>
        <NextUIProvider>
          <MyRouts />
          </NextUIProvider>
      </div>
  );
}

export default App;

//components:
/* 
1. Header
2. Breadcrumb
3. Login section
4. signup section
5. Hero
6. creates
7. expand
8. explore
9. activity
10. connect wallet
11. Item list
12. Item Detail
13. Modal Search
14. sidebar (*not required)[370x660]
----------------------------------------------------------------
----------------------------------------------------------------
Backend
15. contract development
16. buildbear mainnet forking
17. contract testing

*/