import {RxStompConfig} from "@stomp/rx-stomp";
import {environment} from "../../../environments/environment";


export const rxStompConfig: RxStompConfig = {
  brokerURL: environment.WS_URL,
  connectHeaders: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}}`,
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 5000,


};
