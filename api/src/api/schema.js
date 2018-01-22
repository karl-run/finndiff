const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type DetailStringPair {
    beskrivelse: String!
    verdi: String!
  }

  type DetailNumberPair {
    beskrivelse: String!
    verdi: Int!
  }

  type PriceDetails {
    fellesgjeld: DetailNumberPair
    totalpris: DetailNumberPair
    formuesverdi: DetailNumberPair
    fellesformue: DetailNumberPair
    felleskost: DetailNumberPair
  }

  type ApartmentDetails {
    primaerrom: DetailStringPair
    bruksareal: DetailStringPair
    soverom: DetailStringPair
    bruttoareal: DetailStringPair
    rom: DetailStringPair
    etasje: DetailStringPair
    boligtype: DetailStringPair
    eieform: DetailStringPair
    tomteareal: DetailStringPair
    byggeaar: DetailStringPair
    forkjoepsrett: DetailStringPair
    eierskifteforsikring: DetailStringPair
  }

  type GeneralSections {
    innhold: DetailStringPair
    beliggenhet: DetailStringPair
    adkomst: DetailStringPair
    areal: DetailStringPair
    tomten: DetailStringPair
    veivannavloep: DetailStringPair
    borettslaget: DetailStringPair
    styregodkjennelse: DetailStringPair
    felleskostnader: DetailStringPair
    laanevilkaar: DetailStringPair
    utleie: DetailStringPair
    eiendommensbetegnelse: DetailStringPair
    kjoepekontrakt: DetailStringPair
    boligkjoeperforsikring: DetailStringPair
    solgtsomdener: DetailStringPair
    byggemaate: DetailStringPair
    fasteloependekostnader: DetailStringPair
  }

  type Ad {
    pulled: String!
    solgt: Boolean!
    tittel: String
    adresse: String
    pris: Int
    prisDetaljer: PriceDetails
    leilighetsDetaljer: ApartmentDetails
    generelleSeksjoner: GeneralSections
    omkostninger: String
    matrikkelinformasjon: String
  }

  type WatchedAd {
    finnCode: String!
    description: String
  }

  type Query {
    version: String
    watched: [WatchedAd]!
    adHistory(id: String!): [Ad]!
    rawAd(id: String!): Ad!
  }

  type Mutation {
    addWatched(id: String!): Boolean
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
