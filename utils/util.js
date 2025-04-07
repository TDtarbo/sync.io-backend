const handleTryCatchError = (
  res,
  error,
  file = null,
  line = null,
  message = "Oops Something Went Wrong!"
) => {
  if (file && line) {
    logger(`${file}.js @line ${line}`, error)
  } else {
    logger(`${file}.js `, error)
  } 

  responder(res, 500, message)
  
};

const logger = (customMessage, error) => {
  console.error(
    `\n\n\n
${"=".repeat(120)}
Error: Something went wrong ${customMessage}
${"-".repeat(120)}

${error}
${"-".repeat(120)}`
  );
};

const responder = (res , code, message) => {
  res.status(code).json({ message: `${message}` });
}

export default handleTryCatchError;
