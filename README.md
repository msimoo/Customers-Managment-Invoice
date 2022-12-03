# Customers Managment and Invoices Web App

This .net core web api &amp; angular 

<br />
Database Mysql


<br />

<b>*Things to change it.. before the use ^_^ :-</b>

<ul>
  <li>Change the database connection details in 
    <b><i>'appsettings.json' on the root [DIR]</b></i>
  </li>
  <li>Change port in 
    <b><i>'Program.cs'</b></i>,
    <b><i>'proxy.config.json'</b></i>, in 
    <b><i>'/src/environments/environment.ts'</b></i> 
    <br /> [AND] 
    <b><i>'/src/environments/environment.prod.ts'</b></i>
  </li>
</ul>

<br />

<b>How to Start using the app :-</b>

<ul>
  <li>Run the command <b><i>'npm install'</b></i> in a command prompt</li>
  <li>Make sure that all NuGet packages are installed with <b><i>'dotnet restore'</b></i>.</li>
  <li>Run the SQL script in <b><i>'docs/sql/invoice_app.sql'</b></i></li>
  <li>In two seperate command prompts, run the following commands, in this order:
    <ul>
      <li><b><i>ng build</b></i></li>
      <li><b><i>dotnet run</b></i></li>
    </ul>
  </li>
</ul>
<small>*this project makes use of .NET Core SDK 2.2</small>

<br /><br />

# Notice:
<ul>
  <li>Make sure you have initialized the database file in the 'docs/sql/invoice_app.sql'</li>
  
  <li>This App is an assignment for your request</li>

  <li>I have added more entites for completed life cycle on:
    <b><i>class customer{}</b></i> and
    <b><i>class inovice{}</b></i>.
  </li>
</ul>

<br/>
<hr>
<p>Website:<a href="http://elsamani.rf.gd">Mohamed O.Elsamani</a></p>
<p>Phone  :   +249 99 023 3204</p>
<p>Email  :   elsamaniomer@gmail.com</p>
<hr/>
