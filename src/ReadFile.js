export const ReadFile = (file, callback) => {
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const data = event.target.result.trim();
        const numbersArray = data.split(/\s+/); 
        callback(numbersArray);
      };
  
      reader.readAsText(file);
    }
  };
  