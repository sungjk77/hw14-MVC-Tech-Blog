// const { Blog } = require('../../models');

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const ButtonHandler = async (event) => {
  let action = "";
  if (event.target.hasAttribute('id')) {
    action = event.target.getAttribute('id');
  }
  if (event.target.hasAttribute('data-name') && action=="update") {
    document.getElementById("updateModalTitle").defaultValue = event.target.getAttribute('data-name');
    document.getElementById("updateModalText").defaultValue = event.target.getAttribute('data-message');
    document.getElementById("updateID").defaultValue = event.target.getAttribute('data-id');
  }

  //delete portion
  if (event.target.hasAttribute('data-id') && action=="delete") {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete blog');
    }
  }

};

const updateFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#updateModalTitle').value.trim();
  const description = document.querySelector('#updateModalText').value.trim();
  const id = document.querySelector('#updateID').value.trim();

  if (name && description) {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update blog');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', ButtonHandler);

document
  .querySelector('.update-form')
  .addEventListener('click', updateFormHandler);
