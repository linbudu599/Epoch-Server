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
): Promise<boolean | T> {
  const res = await repo.find({ where: findBy });
  console.log(res);
  return res.length > 0 ? (returnRes ? res[0] : true) : false;
}

export default checkIfExist;
