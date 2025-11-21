import { Octokit } from "octokit";

export const fetchGitHubContext = async (owner, repo, token = null) => {
    const octokit = new Octokit({ auth: token || undefined });

    const [meta, tree, readme, langs] = await Promise.all([
        octokit.request("GET /repos/{owner}/{repo}", { owner, repo }),
        octokit.request("GET /repos/{owner}/{repo}/git/trees/main", { owner, repo, recursive: "1" }),
        octokit.request("GET /repos/{owner}/{repo}/readme", { owner, repo }).catch(() => null),
        octokit.request("GET /repos/{owner}/{repo}/languages", { owner, repo })
    ]);

    return {
        name: meta.data.name,
        description: meta.data.description,
        structure: tree.data.tree.map(f => f.path).slice(0, 500), // limit to avoid bloat
        languages: Object.keys(langs.data),
        readme: readme ? Buffer.from(readme.data.content, "base64").toString() : ""
    };
};
