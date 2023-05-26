document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url-input');
    const shortenButton = document.getElementById('shorten-button');
    const shortUrlElement = document.getElementById('short-url');
  
    shortenButton.addEventListener('click', function() {
      const url = urlInput.value;
      if (url) {
        shortenUrl(url, function(shortUrl) {
          shortUrlElement.textContent = 'Short URL: ' + shortUrl;
          copyToClipboard(shortUrl);
        });
      }
    });
  
    function shortenUrl(url, callback) {
      const accessToken = '79198993d8e0d1a4773ba9529a6eec76c942893a'; 
      const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
  
      const xhr = new XMLHttpRequest();
      xhr.open('POST', apiUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const shortUrl = response.id;
          callback(shortUrl);
        }
      };
  
      const data = JSON.stringify({ long_url: url });
      xhr.send(data);
    }
  
    function copyToClipboard(text) {
      const input = document.createElement('input');
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
  });