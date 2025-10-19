import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme:{
    tokens:{
        colors:{
            // main : {value:"#1B1C1E"},
            main : {value:"#2e2e37"},
            hover : {value:"#37373eff"},
            inactive : {value:"#808487"},
            primary : {value:"#A1EED6"},
            secondary :{value:"#F2B694"},
            text : {value : "#ffffffde"}
        },
        fonts:{
            body:{
                value: "Segoe UI, Tahoma, Geneva, Verdana",
            }

        }
    }
  },
  
    globalCss: {

        "html, body":{
            backgroundColor: "main",
            color:"text",
        }
        
  },
});

export const system = createSystem(defaultConfig, customConfig);





