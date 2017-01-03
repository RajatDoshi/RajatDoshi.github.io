# Emotipad
Visualize the emotions in your writing.

### How does this work?

I use jQuery to capture the text input and parse it into an array of sentences using Regular Expressions. Finally, I send this array as a JSON object via a HTTP POST request to a machine learning API called Indico.io. Indico returns senitment scores for positivity, anger, fear, joy, sadness, and surprise using the latest techniques in natural language processing. I finally leverage the Plotly JavaScript Visualization library to graph these sentiment scores sentence by sentence.
