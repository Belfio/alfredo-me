# LLM Text Extraction

## Notes on development and eval system

I am working on a project that takes documetns of various format and transforms them into structured data that will go into a CRM.
The interesting parts are:

1. The entries in the CRM will update the old entries
2. Each update is tracked with citations: links to the original document
3. It treats graphs, weird layouted documents, complex xlsx.

## The input format

Let's start from what kind of documents we can ingest.
So far i have tested the PDFs and I am quite comfortable with the work. The most usual and easiest flow is using RAG and follows this way:

1. Upload the PDF in your server
1. Embed it and store it in a vector database
1. Retrieve information using RAG

This is great but limited, RAG is great at textual information retrieval. Much worse to understand graphs and very unstructured text like infographic that relies heavily on custom layouts.

So how can we retrieve the non-textual information?
We use the multimodality models to look at a screenshot of each page of the PDF and describe it accurately.
We turn the PDF into Images and then into Text.

Please notice that this flow works well with Powerpoint documents as well. It does not work with xlsx.
<br />
2026-01-18
