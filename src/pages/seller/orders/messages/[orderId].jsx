import MessageContainer from "@/components/Messages/MessageContainer";
import React, {useEffect} from "react";
import {useStateProvider} from "@/context/StateContext";
import {useRouter} from "next/router";

function Message() {
    const [{userInfo}] = useStateProvider()
    const router = useRouter()
    useEffect(() => {
        !userInfo ? router.push("/") : ""
    }, [])
  return (
    <div>
      <MessageContainer />
    </div>
  );
}

export default Message;