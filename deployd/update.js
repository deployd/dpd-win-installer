require('shelljs/global');

var npm = require('npm')
  , Stream = require('stream')
  , stdin = process.openStdin()
  , dummyStream = new Stream()
  , deploydPackage;

process.chdir(__dirname);

process.stdin.setRawMode(true);    

function loadInfo(err) {
  abortIf(err);
  checkCurrentVersion();
}

function checkCurrentVersion() {
  if (~process.argv.indexOf('-f') || ~process.argv.indexOf('--force')) {
    echo("Cleaning directory to force reinstall...");
    rm('-rf', './node_modules/deployd');
    install();
  } else if (test('-d', './node_modules/deployd')) {
    try {
      deploydPackage = require('./node_modules/deployd/package');  
      echo("Found Deployd version " + deploydPackage.version);
      npm.config.set('outfd', dummyStream);
      npm.commands.info(['deployd'], checkLatestVersion);
    } catch (ex) {
      echo("Deployd installation corrupted. Cleaning directory...");
      rm('-rf', './node_modules/deployd');
      install();
    }
    
  } else {
    install();
  }
}

function install() {
  echo("Installing Deployd...");
  
  // npm.commands.install(['deployd'], finished);
  npm.commands.install(['git://github.com/deployd/deployd.git'], finished);
}

function checkLatestVersion(err, data) {
  npm.config.set('outfd', process.stdout);
  abortIf(err);
  var version = Object.keys(data)[0];
  echo("Latest version is " + version);
  if (version !== deploydPackage.version) {
    echo("Updating Deployd...");
    npm.commands.update(['deployd'], finished);
  } else {
    echo("Up to date. If needed, use the --force flag to reinstall");
    end(0);
  }
}

function finished(err) {
  abortIf(err);
  delete require.cache[require.resolve('./node_modules/deployd/package')];

  var newPackage = require('./node_modules/deployd/package'),
      version = newPackage.version;

  echo("Installed Deployd version " + version);
  end(0);
}

function abortIf(err) {
  if (err) {
    echo(err);
    end(1);  
  }  
}

function end(code) {
  if (~process.argv.indexOf('-w') || ~process.argv.indexOf('--wait')) {
    echo("");
    process.stdout.write("Press any key to continue...");
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function() {
      echo("");
      exit(code);
    });
  } else {
    exit(code);  
  }
}

//TODO: Don't force!
process.argv.push('-f');
npm.load({production: true}, loadInfo);