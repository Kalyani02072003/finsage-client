import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Box, Card, CardContent, Container, CircularProgress, Typography, TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faPen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Navbar from "../HomePage/Navbar/Navbar";
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& label': {
    color: '#FFFFFF', // Change color of label
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#FFFFFF', // Change border color
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF', // Change border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF', // Change border color on focus
    },
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF', // Change color of input text
  },
});

function Chatroom() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer...");
    try {
      const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyA3D5SINXd3OHPDBUlweJuhMWXu-Mv9u0A", {
        contents: [{ parts: [{ text: question }] }],
      });

      setAnswer(response?.data?.candidates[0]?.content?.parts[0]?.text || "No answer found");
    } catch (error) {
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
    setQuestion(""); // Resetting the prompt area after generating the answer
  }

  return (
    <>
      <Navbar /> {/* Navbar stays outside the centered Box */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh" // This will make the Box fill the entire viewport vertically
      >
        <Container maxWidth="md">
          <Typography variant="h5" align="center" gutterBottom style={{marginBottom:'15px'}}>
            Ask Anything to AI chat
          </Typography>
          <Card variant="outlined" sx={{ borderRadius: 4, backgroundColor: '#002B36', marginTop: answer ? 2 : 0 }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <FontAwesomeIcon icon={faPaperPlane} bounce size="2x" style={{ marginRight: 10 ,color:'#FFFFFF'}} />
                <Typography variant="h5" align="center" style={{color:'#FFFFFF'}}>Stock AI Chat</Typography>
              </Box>
              <form onSubmit={generateAnswer} >
                  <StyledTextField
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Ask anything"
                      fullWidth
                      variant="outlined"
                      style={{ marginTop: 10 }}
                  />
                <Box textAlign="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={generatingAnswer}
                    style={{ width: '40%', backgroundColor:'#4FB0C6' }} // Adjusting button width
                  >
                    {generatingAnswer ? <CircularProgress size={24} /> : "Generate Answer"}
                  </Button>
                </Box>
              </form>
              {answer && (
                <Box mt={2}>
                  <Card variant="outlined" style={{backgroundColor: '#002B36'}}>
                    <CardContent>
                      {generatingAnswer ? (
                        <Typography color="primary" align="center" style={{color:'#00BFB3'}}>
                          <FontAwesomeIcon icon={faPen} bounce size="2x" />
                          <br />
                          Loading your answer...
                        </Typography>
                      ) : (
                        <div style={{ color: '#FFFFFF' }}>
                          <ReactMarkdown>{answer}</ReactMarkdown>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}
            </CardContent>
          </Card>
          <Box mt={2} textAlign="center" style={{marginBottom:10}}>
            <Typography variant="caption" style={{color:'#F5F5F5'}}>Powered by Gemini Pro</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Chatroom;
