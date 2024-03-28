import { useState } from "react";
import AWS from "aws-sdk";
import {
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { Spin } from "antd";
const SpeechText = () => {
  const [source, setSource] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("");
  const convertTextToSpeech = async (userText) => {
    setLoading(true);

    const pollyObj = new AWS.Polly();
    const params = {
      Text: userText,
      OutputFormat: "mp3",
      VoiceId: "Matthew", // Choose a voice from Amazon Polly
    };

    try {
      const data = await pollyObj.synthesizeSpeech(params).promise();
      console.log(data);
      setLoading(false);
      setAudio(URL.createObjectURL(new Blob([data.AudioStream])));
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  // const convertTextToSpeech = async (userText) => {
  //   setLoading(true);
  //   setText(userText);
  //   console.log(userText);
  //   try {
  //     const response = await fetch(
  //       "https://xhf9j1fm55.execute-api.us-east-2.amazonaws.com/dev/senddata",
  //       {
  //         method: "POST",
  //         text: userText, // Sending text as JSON payload
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch audio");
  //     }
  //     const { body } = response; // Assuming the response contains a field named audioData with Base64 encoded audio
  //     console.log(body);
  //     // Decode Base64 audio data into binary data
  //     const binaryData = atob(body);

  //     // Convert binary data into an ArrayBuffer
  //     const arrayBuffer = new ArrayBuffer(binaryData.length);
  //     const uint8Array = new Uint8Array(arrayBuffer);
  //     for (let i = 0; i < binaryData.length; i++) {
  //       uint8Array[i] = binaryData.charCodeAt(i);
  //     }

  //     // Create object URL from ArrayBuffer
  //     const audioUrl = URL.createObjectURL(
  //       new Blob([arrayBuffer], { type: "audio/mpeg" })
  //     );

  //     setAudio(body); // Set the audio URL to the state variable
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error converting text to speech:", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Center bg="orange">
        <Text fontSize="4xl" color="whitesmoke">
          Text-To-Speech
        </Text>
      </Center>
      <Box width="45%" border="1px solid" p={2} mt="3rem" ml="1rem">
        <FormControl>
          <Center>
            teal
            <FormLabel>Enter the Text</FormLabel>
          </Center>
          <Input
            type="text"
            size="lg"
            height="100"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSource("");
                // console.log(text);
                convertTextToSpeech(text);
              }
            }}
          />
        </FormControl>
      </Box>
      {loading ? <Spin spinning={loading} size="large"></Spin> : <></>}
      <Box width="45%" border="1px solid" p={2} mt="3rem" ml="1rem">
        {audio && (
          <audio controls>
            <source src={audio} type="audio/mpeg"></source>
          </audio>
        )}
      </Box>
    </Box>
  );
};

export default SpeechText;
