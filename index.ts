import { execSync } from "child_process";
import { Client } from "discord.js";

export function getCommitVersion(options?: { dateFormat: string }): string {
    try {
        const format = options?.dateFormat || "%cd";
        return execSync(`git log -1 --format=${format} --date=iso`).toString().trim();
    } catch {
        return "unknown";
    }
}
/**
 * 
 * @param client discord.js client instance
 * @param bio the new bio to set, you can use {commitVersion} as a placeholder for the commit version
 * @returns 
 */
export async function changeBotBio(client: Client, bio: string, options?: { commitDateOption: string}): Promise<boolean> {
  if (!client.application) throw new Error("Client application is not available.");
  const commitVersion = getCommitVersion(options?.commitDateOption ? { dateFormat: options.commitDateOption } : undefined);
  return !!await client.application.edit({ "description": bio.replace("{commitVersion}", commitVersion) });
}