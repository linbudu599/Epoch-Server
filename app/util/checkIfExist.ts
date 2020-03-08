import { Repository } from "typeorm";

/**
 *
 *
 * @template RepoTyoe
 * @param {Repository<T>} repo
 * @param {*} findBy  conditions
 * @param {boolean} [returnRes=false] return check result or isExist
 * @returns {(Promise<boolean | T[]>)}
 */
async function checkIfExist<T>(
  repo: Repository<T>,
  findBy: any,
  returnRes: boolean = false
): Promise<boolean | T[]> {
  const res = await repo.find({ where: findBy });
  // return res.length > 0 ? (returnRes ? res[0] : true) : false;
  return res.length > 0;
}

export default checkIfExist;
