## Ciklum JavaScript internship test task

## How to use

Clone into the current folder and remove all unnecessary (one command):

<pre>git clone https://github.com/Illiachr/intership-test-task.git .; rm -rf trunk .gitignore .eslintrc readme.md .git</pre>
<ol>
  <li>Clone or Download from GitHub</li>
  <li>Install Node Modules: npm i</li>
  <li>Run webpack:
    <ul>
      <li>develop mode: <pre>npm run dev</pre></li>
      <li>production mode: <pre>npm run build</pre></li>      
    </ul>
  </li>
</ol>

### Used technologies:

- JavaScript
- HTML5 / CSS3
- SCSS
- Webpack bundler whit babel
- ESLint whit airbnb style guide

## Features

### 1. Add new event

Click `New Event+` button, then use craete event dialog to enter meeting title, select day and time.
After that submit creation new event by cllick `Create` button or press
`Enter`

### 2. Filter events

You can filter events by person. Just choose the member of in the `dropdown menu` at the left of `New Event+` button.

### 3. Event remove

To remove event - click the delete icon near the meeting title at “Calendar” screen and then confirm his action in a confirmation dialog.

### 4. Change time and day

To change event time or day - `drag` choosen event and `drop` it to another slot.

### 5. Store events

All event data are stored to local storage.

### Link to GitHub Pages

https://illiachr.github.io/internsip-test-task.github.io/
