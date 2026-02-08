## HTML Table

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Simple Table</title>
  <style>
    table {
      width: 60%;
      border-collapse: collapse;
      margin: 20px auto;
      font-family: Arial, sans-serif;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    tr:nth-child(even) {
      background-color: #fafafa;
    }
  </style>
</head>
<body>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Ankit</td>
        <td>Frontend Developer</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Rahul</td>
        <td>Backend Developer</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Priya</td>
        <td>UI Engineer</td>
      </tr>
    </tbody>
  </table>

</body>
</html>

```