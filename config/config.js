const convict = require('convict');

// Define a schema
var conf = convict({
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  ip: {
    doc: "The IP address to bind (really should be 127.0.0.1 for security).",
    format: "ipaddress",
    default: "0.0.0.0",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT"
  },
  elasticsearch: {
      host: {
          doc: "ES Host",
          format: String,
          default: "http://jared_lewark_2016_09_24:WRxMiKH3BzXH@ec2-54-173-213-231.compute-1.amazonaws.com:9200",
          env: "ELASTICSEARCH_HOST"
      },
      username: {
          doc: "ES Username",
          format: String,
          default: "jared_lewark_2016_09_24",
          env: "ELASTICSEARCH_USER"
      },
      pass: {
          doc: "ES Pass",
          format: String,
          default: "WRxMiKH3BzXH",
          env: "ELASTICSEARCH_PASS"
      },
      index: {
          doc: "ES index",
          format: String,
          default: "jared_lewark_2016_09_24_index",
          env: "ELASTICSEARCH_INDEX"
      }
   }
});

// Load environment dependent configuration
//let env = conf.get('env');
//conf.loadFile('./config/' + env + '.json');

// Perform validation
conf.validate({strict: true});

module.exports = conf.get();
