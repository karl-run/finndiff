const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type DetailStringPair {
    beskrivelse: String
    verdi: String
  }

  type DetailNumberPair {
    beskrivelse: String
    verdi: Int
  }

  type PriceDetails {
    fellesgjeld: DetailNumberPair
    totalpris: DetailNumberPair
    formuesverdi: DetailNumberPair
    fellesformue: DetailNumberPair
    felleskost: DetailNumberPair
  }

  type ApartmentDetails {
    primaerrom: DetailNumberPair
    bruksareal: DetailNumberPair
    soverom: DetailNumberPair
    bruttoareal: DetailNumberPair
    rom: DetailNumberPair
    etasje: DetailNumberPair
    boligtype: DetailStringPair
    eieform: DetailStringPair
    tomteareal: DetailStringPair
    byggeaar: DetailNumberPair
    forkjoepsrett: DetailStringPair
    eierskifteforsikring: DetailStringPair
    festeavgift: DetailNumberPair
    energimerking: DetailStringPair
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
    oppvarming: DetailStringPair
    tinglysterettigheterogforpliktelser: DetailStringPair
    ligningsverdi: DetailStringPair
    beskrivelseavborettslaget: DetailStringPair
    fasteloependekostnader: DetailStringPair
    finansiering: DetailStringPair
    spesifikasjonavlaan: DetailStringPair
    adgangtilutleieboligformaal: DetailStringPair
    overtagelse: DetailStringPair
    forkjoepsrettformedlemmerstyregodkjennelse: DetailStringPair
    ansvarligmegler: DetailStringPair
    standard: DetailStringPair
    regulering: DetailStringPair
    sentralelover: DetailStringPair
    vedlikeholdtilstand: DetailStringPair
    parkering: DetailStringPair
    utstyr: DetailStringPair
    servitutterrettigheter: DetailStringPair
    ferdigattestellermidlbrukstillatelse: DetailStringPair
    reguleringsforhold: DetailStringPair
    budgiving: DetailStringPair
    kortomeiendommen: DetailStringPair
  }

  type Ad {
    pulled: String!
    solgt: Boolean
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
    description: String!
    lastChanged: String
    sold: Boolean
    changes: Int
  }
  
  type User {
    loggedIn: Boolean!
    name: String,
  }

  type Query {
    version: String
    user: User
    watched(orderBy: String = "changes"): [WatchedAd]!
    liked(orderBy: String = "changes"): [WatchedAd]!
    adHistory(id: String!): [Ad]!
    rawAd(id: String!): Ad!
  }

  type Mutation {
    addWatched(id: String!): Boolean
    like(id: String!): Boolean
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
