import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

function RequestInfo() {
  const [info, setInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((resp) => setInfo(resp.data))
      .catch(() => setInfo("Error"));
  }, []);

  return (
    <>
      <div>Informacion</div>

      <pre>{JSON.stringify(info, null, 2)}</pre>
    </>
  );
}

export default RequestInfo;
