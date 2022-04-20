# JSON Schemas in Qverview
Qverview requires different data sets to work properly. All data are saved as `.json` files. Below you will find the
different files you need and how they should be structured.

## Qverview Schemas and Data Repository
Qverview retrieves the data from a **data repository**, i.e. an url that points to the parent directory of the required
`.json` files. Each of the file need to have a certain structure. This structure can be enforced by applying 
[JSON Schemas](https://json-schema.org/) which you can use to validate your data.

The following data sets are required in Qverview. If you do not need a certain data set, Qverview will still make a request
to the endpoint, so please make sure that the server still answers with `200 OK` and replies with an empty body (or with `[]`
, i.e. empty array).

| Name | Schema File | Required JSON File name (Endpoint) |
| ---- | ----------- |------------------------------------|
| Software Development Kits | `software_development_kits_schema.json` | `/SoftwareDevelopmentKits.json`    |
| Quantum Execution Resources | `quantum_execution_resources_schema.json` | `/QuantumExecutionResources.json`  |
| Quantum Cloud Services | `cloud_services_schema.json` | `/CloudServices.json`              |
| (Quantum) Programming Languages | `programming_languages_schema.json` | `/ProgrammingLanguages.json`       |
| Compilers and Transpilers | `compiler_and_transpiler_schema.json` | `/CompilersAndTranspilers.json`    |
| Orchestrators | `orchastrators_schema.json` | `/Orchestrators.json`              |

When Qverview wants to retrieve a certain data set, for example `Software Development Kits`, it makes a GET request to
the repository you gave (or the default repository) appending the Json file name at the end from the table above, i.e.
`<repository url>/SoftwareDevelopmentKits.json`. Make sure that the server where your data repository lies can answer them
correctly.

If the data conforms to the given schema files, the data should be displayed correctly in Qverview.

## Citations
Qverview allows you to add citations to your data. The citations can either be a BibTex entry or a simple link.
The BibTex file should be accessible by the `/references.bib` endpoint.

Given a valid BibTex file, each entry should have an id. When you want to cite, follow the steps below:

1. Add a `"_references"` object to the data object where you want to cite.
2. For each property where you'd like to cite, add `"<property>": [<citations>]`.
3. The `<citations>` should be an array of strings of the following format: When you'd like to add a BibTex
   reference, do `"bib:<BibTex-EntryId>`. If it is a link, do `"link:<url>"`.

#### Example
Let's say you'd like to add a BibTex citation to the `licenses` entry in the SDK *Qiskit*. The BibTex entry has an id `Qiskit2021`
as well. Then the `SoftwareDevelopmentKits.json` file will look like this:

```json
[
  {
    "name": "Qiskit",
    "licenses": ["Apache 2.0", "..."],
    ...,
    "_references": {
      "licenses": "bib:Qiskit2021"
    }
  }
]
```

The `references.bib` looks like this:
```bibtex
@misc{Qiskit2021,
author={Authors...},
    ...
}
```

For further examples, look at the [official repository](https://www.github.com/kjuli/QverviewData).
