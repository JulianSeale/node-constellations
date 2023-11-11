document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('addButton');
    const form = document.getElementById('form');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const imageInput = document.getElementById('imageInput'); // Add this line to get the image input
  
    addButton.addEventListener('click', () => {
      form.style.display = 'block';
    });
  
    submitButton.addEventListener('click', async () => {
      try {
        const formData = new FormData(); // Use FormData to handle file uploads
        formData.append('name', document.getElementById('name').value);
        formData.append('year', document.getElementById('year').value);
        formData.append('myth', document.getElementById('myth').value);
        formData.append('culture', document.getElementById('culture').value);
        formData.append('appearance', document.getElementById('appearance').value);
        formData.append('distance_from_earth_miles', parseInt(document.getElementById('distance').value));
        formData.append('img', imageInput.files[0]); // Append the image file
  
        const response = await fetch('https://constell.onrender.com/api/constellations', {
          method: 'POST',
          body: formData, // Use the FormData object as the body
        });
  
        const result = await response.json();
  
        if (response.ok) {
          successMessage.textContent = result.message;
          successMessage.style.display = 'block';
        } else {
          errorMessage.textContent = result.error;
          errorMessage.style.display = 'block';
        }
  
        setTimeout(() => {
          successMessage.style.display = 'none';
          errorMessage.style.display = 'none';
        }, 3000);
  
        fetchData();
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    async function fetchData() {
      try {
        const response = await fetch('https://constell.onrender.com/api/constellations');
        const data = await response.json();
        renderData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function renderData(data) {
      const app = document.getElementById('app');
      app.innerHTML = '';
  
      data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p><strong>Year:</strong> ${item.year}</p>
          <p><strong>Myth:</strong> ${item.myth}</p>
          <p><strong>Culture:</strong> ${item.culture}</p>
          <p><strong>Appearance:</strong> ${item.appearance}</p>
          <p><strong>Distance from Earth:</strong> ${item.distance_from_earth_miles} miles</p>
          <img src="${item.img}" alt="${item.name}" /> <!-- Display the image -->
        `;
        app.appendChild(card);
      });
    }
     // Show welcome popup for 2 seconds
  const welcomePopup = document.getElementById('welcome-popup');
  welcomePopup.style.display = 'block';
  setTimeout(() => {
    welcomePopup.style.display = 'none';
  }, 10000);
  
    // Initial fetch and render
    fetchData();
  });
  