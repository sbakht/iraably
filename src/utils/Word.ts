type translated = { text: string }

type Rafa = "Rafa"
type Nasb = "Rafa"
type Jar = "Rafa"

type Status = Rafa | Nasb | Jar

type Reason1 = { key: "Reason1", value: string }
type Reason2 = { key: "Reason2", value: string }
type Reason3 = { key: "Reason3", value: string }
type Reason4 = { key: "Reason4", value: string }
type Reason5 = { key: "Reason5", value: string }
type Reason6 = { key: "Reason6", value: string }
type Reason7 = { key: "Reason7", value: string }

type Singular = 'Singular'
type Dual = Reason1 | Reason2
type Plural = Reason1 | Reason2 | Reason3

type Plurality = Singular | { key: 'Dual', value: Dual } | { key: 'Plural', value: Plural }

type Proper =
  | Reason1
  | Reason2
  | Reason3
  | Reason4
  | Reason5
  | Reason6
  | Reason7

type Common = 'Common'
type Commonality = { key: 'Proper', value: Proper } | Common

type Feminine =
  | Reason1
  | Reason2
  | Reason3
  | Reason4
  | Reason5

type Masculine = 'Masculine'
type Gender = Masculine | { key: 'Feminine', value: Feminine }

type Word = {
  text: string,
  status: Status,
  number: Plurality,
  gender: Gender,
  commonality: Commonality
}